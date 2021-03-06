import './style/index.css'
import { $ } from './util'
import API from './api/'
import Template from './template'
import Router from './router/'
import Obeserver from './observer'
import { switchToHome, switchToPost } from './switch'
import sleep from './switch/sleep'

const mirror = {
  __: {},
  issues: {},
  issue: {},
  comments: {},
  zen: ""
}
const TPL = new Template(mirror)
const { perpage } = window.config

async function onPosts(type, params) {
  if (mirror.user) {
    TPL.user(mirror.user)
  } else {
    const { user, organization } = await API.user()
    mirror.user = user || organization
  }

  mirror.getPosts(type, params)
}

function onPost({ id }) {
  mirror.getPost(id)
}

const router = new Router({
  '/': params => onPosts('after', params),
  '/posts/:id': onPost,
  '/after/:cursor': params => onPosts('after', params),
  '/before/:cursor': params => onPosts('before', params),
})
const observer = new Obeserver(mirror)

mirror.getPosts = async function getPosts(type, { cursor, e }) {
  document.title = window.config.title

  const hash = cursor || '_'

  let posts = this.issues[hash]

  if (posts) {
    TPL.issues(posts)
  } else {
    const {
      repository: {
        issues: {
          edges,
          pageInfo,
          totalCount,
        },
      },
    } = await API.issues(type, cursor)

    posts = {
      pageInfo,
      totalCount,
      edges,
    }

    if (perpage > 1) {
      this.issues = Object.assign({ [hash]: posts }, this.issues)
    } else {
      TPL.issues(posts)
    }

    await sleep(200)
  }

  if (e && e.oldURL.indexOf('/posts/') > -1) {
    await switchToHome()
  }
}

mirror.getPost = async function getPost(number) {
  document.title = 'loading'

  let post = this.issue[number]

  if (post) {
    TPL.issue(post)
  } else {
    const { repository } = await API.issue(number)
    post = repository.issue
    this.issue = Object.assign({ [number]: post }, this.issue)
    await sleep(200)
  }

  document.title = `${post.title} - ${window.config.title}`

  switchToPost()
}

mirror.openComments = async function openComments(params, ele) {
  $('#comments').html('')
  await this.getComments(params)
  $(ele).parent().hide()
}

mirror.getComments = async function getComments(params) {
  const [id, after] = params.split('#')
  const comment = this.comments[id]

  if (comment && !after) {
    TPL.comments(comment)
  } else {
    const {
      repository: {
        issue: {
          number,
          comments: {
            totalCount,
            pageInfo,
            edges,
          },
        },
      },
    } = await API.comments(id, after)

    const newComment = {
      number,
      comments: {
        totalCount,
        pageInfo,
        edges: comment && number === Number(id) ? comment.comments.edges.concat(edges) : edges,
      },
    }

    const allComments = Object.assign({}, this.comments)

    if (number === Number(id)) {
      allComments[id] = newComment
      this.comments = allComments
    } else {
      this.comments = Object.assign({ [number]: newComment }, this.comments)
    }
  }

  return Promise.resolve()
}

router.notFound = () => {
  window.location.hash = '/'
}
router.init = (route) => {
  if (route.indexOf('/posts/') > -1) {
    $('.single').addClass('page-current')
  } else {
    $('.home').addClass('page-current')
  }
}

observer.watch({
  user: TPL.user.bind(TPL),
  issues: TPL.issues.bind(TPL),
  issue: TPL.issue.bind(TPL),
  comments: TPL.comments.bind(TPL),
})

router.start()

// eslint-disable-next-line no-console
// console.log('%c Github %c', 'background:#24272A; color:#ffffff', '', 'https://github.com/LoeiFy/Mirror')

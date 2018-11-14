import emailIcon from '../svg/email.svg'
import linkIcon from '../svg/link.svg'
import githubIcon from '../svg/github.svg'
import juejinIcon from '../svg/juejin.svg'
import { $ } from '../util'

class User {
  constructor(selector) {
    this.container = $(selector)
    this.user = null
  }

  get email() {
    const email = this.user.email || this.user.organizationBillingEmail
    return email ? `<a target="_blank" title="邮箱" href="mailto:${email}">${emailIcon}</a>` : ''
  }

  get website() {
    const { websiteUrl } = this.user

    if (!websiteUrl) {
      return ''
    }
    if (/^(http:|https:)/.test(websiteUrl)) {
      return `<a target="_blank" href="${websiteUrl}">${linkIcon}</a>`
    }

    return `<a target="_blank" href="//${websiteUrl}">${linkIcon}</a>`
  }

  get bio() {
    return this.user.bio ? `<p>${this.user.bio}</p>` : ''
  }

  get juejin() {
    return "https://juejin.im/user/576666b7207703006b1e0f09/posts"
  }

  render(userData) {
    this.user = userData

    const {
      user,
      email,
      website,
      bio,
      juejin,
      container,
    } = this

    container.html(`
      <a href="#/">
        <img src="${user.avatarUrl}" />
      </a>
      <h1>${user.name || user.login}</h1>
      ${bio}
      <div class="social">
        <a target="_blank" title="掘金" href="${juejin}">${juejinIcon}</a>
        <a target="_blank" title="Github" href="${user.url}">${githubIcon}</a>
        ${email}
      </div>
    `)
  }
}

export default User

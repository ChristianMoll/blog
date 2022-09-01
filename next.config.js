const prod = process.env.NODE_ENV == "production"

let csp = ``
csp += `base-uri 'self';`
csp += `form-action 'self' https://cmoll.vercel.app https://cmoll.vercel.app/* https://cmoll.vercel.app https://github.com;`
csp += `default-src 'self';`
csp += `script-src 'self' ${prod ? "" : "'unsafe-eval'"};` // NextJS requires 'unsafe-eval' in dev (faster source maps)
csp += `style-src 'self' 'unsafe-inline' data:;` // NextJS requires 'unsafe-inline'
csp += `img-src 'self' data: blob:;`
csp += `font-src 'self';`
csp += `frame-src 'self';`
csp += `media-src 'self';`

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: csp.replace(/\s{2,}/g, ' ').trim()
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'same-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), usb=(), geolocation=()'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

AppSettings = {
  // @if NODE_ENV='development'
  baseApiUrl: 'http://localhost:3000',
  debug: true
  // @endif
  // @if NODE_ENV='test'
  baseApiUrl: 'http://localhost:3000'
  // @endif
  // @if NODE_ENV='production'
  baseApiUrl: 'http://104.236.252.208'
  // @endif
}

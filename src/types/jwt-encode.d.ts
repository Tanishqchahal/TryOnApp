declare module 'jwt-encode' {
  interface JWTHeader {
    alg: string;
    typ: string;
  }

  function encode(payload: any, secret: string, header?: JWTHeader): string;
  export default encode;
} 
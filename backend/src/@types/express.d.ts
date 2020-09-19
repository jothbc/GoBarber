declare namespace Express {
  export interface Request {
    // ele nao substitui, somente faz anexo
    user: {
      id: string;
    };
  }
}

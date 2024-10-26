import { Timestamp } from "firebase/firestore";
import { CONSTANTES } from "./constantes";

interface IProduct {
  id: string;
  name: string;
  linkImage: string;
  linkAliexpress: string;
  linkAmazon: string;
  linkMercadoLivre: string;
  categoria: string;
  ativo: boolean;
  dataCadastro?: Timestamp;
}

export class Product implements IProduct {
  id: string;
  name: string;
  linkImage: string;
  linkAliexpress: string;
  linkAmazon: string;
  linkMercadoLivre: string;
  categoria: string;
  ativo: boolean;
  dataCadastro?: Timestamp;

  constructor(
    id: string,
    name: string,
    linkImage: string,
    linkAliexpress: string,
    linkAmazon: string,
    linkMercadoLivre: string,
    categoria: string,
    ativo: boolean,
    dataCadastro?: Timestamp
  ) {
    this.id = id;
    this.name = name;
    this.linkImage = linkImage;
    this.linkAliexpress = linkAliexpress;
    this.linkAmazon = linkAmazon;
    this.linkMercadoLivre = linkMercadoLivre;
    this.categoria = categoria;
    this.ativo = ativo;
    this.dataCadastro = dataCadastro ?? Timestamp.now();
  }

  static empty() {
    return new Product(
      CONSTANTES.VAZIO,
      CONSTANTES.VAZIO,
      CONSTANTES.VAZIO,
      CONSTANTES.VAZIO,
      CONSTANTES.VAZIO,
      CONSTANTES.VAZIO,
      CONSTANTES.VAZIO,
      false
    );
  }
}

export default Product;

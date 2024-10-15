import { Timestamp } from "firebase/firestore";
import { CONSTANTES } from "./constantes";

export default class Product {
  id: string;
  name: string;
  linkImage: string;
  linkAliexpress: string;
  linkAmazon: string;
  linkMercadoLivre: string;
  ativo: boolean;
  dataCadastro?: Timestamp;

  constructor(
    id: string,
    name: string,
    linkImage: string,
    linkAliexpress: string,
    linkAmazon: string,
    linkMercadoLivre: string,
    ativo: boolean,
    dataCadastro?: Timestamp
  ) {
    this.id = id;
    this.name = name;
    this.linkImage = linkImage;
    this.linkAliexpress = linkAliexpress;
    this.linkAmazon = linkAmazon;
    this.linkMercadoLivre = linkMercadoLivre;
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
      false
    );
  }
}

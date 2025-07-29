export interface Document {
  id: number;
  name: string;
  type: string;
  category: string;
  identity: string;
  issueDate: string;
  validDate: string;
  status: "Aprovado" | "Pendente" | "Reprovado";
  value?: string;
  note?: string;
}

export type TabType =
  | "meus-documentos"
  | "criar-documento"
  | "aprovar-documento"
  | "gerenciar-documentos";

export interface FormData {
  passportId: string;
  validity: string;
  name: string;
  value: string;
  type: string;
  signature: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface SubmitMessage {
  type: "success" | "error";
  message: string;
} 
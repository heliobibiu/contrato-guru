
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      aditivos: {
        Row: {
          id: string
          contrato_id: string
          numero_aditivo: string
          tipo_aditivo: string
          justificativa: string
          valor_aditivo: number
          nova_prazo?: string | null
          data_assinatura: string
          created_at?: string | null
          updated_at?: string | null
        }
        Insert: {
          id?: string
          contrato_id: string
          numero_aditivo: string
          tipo_aditivo: string
          justificativa: string
          valor_aditivo: number
          nova_prazo?: string | null
          data_assinatura: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          contrato_id?: string
          numero_aditivo?: string
          tipo_aditivo?: string
          justificativa?: string
          valor_aditivo?: number
          nova_prazo?: string | null
          data_assinatura?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      apostilas: {
        Row: {
          id: string
          contrato_id: string
          numero_apostila: string
          descricao: string
          data_registro: string
          created_at?: string | null
          updated_at?: string | null
        }
        Insert: {
          id?: string
          contrato_id: string
          numero_apostila: string
          descricao: string
          data_registro: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          contrato_id?: string
          numero_apostila?: string
          descricao?: string
          data_registro?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      contratos: {
        Row: {
          id: string
          numero_contrato: string
          fornecedor: string
          fiscal_id: string
          gestor_id: string
          setor_id: string
          data_inicio_execucao: string
          data_termino_execucao: string
          valor_original: number
          status: string
          created_at?: string | null
          updated_at?: string | null
        }
        Insert: {
          id?: string
          numero_contrato: string
          fornecedor: string
          fiscal_id: string
          gestor_id: string
          setor_id: string
          data_inicio_execucao: string
          data_termino_execucao: string
          valor_original: number
          status: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          numero_contrato?: string
          fornecedor?: string
          fiscal_id?: string
          gestor_id?: string
          setor_id?: string
          data_inicio_execucao?: string
          data_termino_execucao?: string
          valor_original?: number
          status?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      convenios: {
        Row: {
          id: string
          numero_convenio: string
          participante_origem: string
          participante_destino: string
          fiscal_id: string
          gestor_id: string
          setor_id: string
          data_inicio: string
          data_termino: string
          valor_total: number
          status: string
          created_at?: string | null
          updated_at?: string | null
        }
        Insert: {
          id?: string
          numero_convenio: string
          participante_origem: string
          participante_destino: string
          fiscal_id: string
          gestor_id: string
          setor_id: string
          data_inicio: string
          data_termino: string
          valor_total: number
          status: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          numero_convenio?: string
          participante_origem?: string
          participante_destino?: string
          fiscal_id?: string
          gestor_id?: string
          setor_id?: string
          data_inicio?: string
          data_termino?: string
          valor_total?: number
          status?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      fiscais: {
        Row: {
          id: string
          usuario_id: string
          matricula: string
          especialidade: string
          created_at?: string | null
          updated_at?: string | null
        }
        Insert: {
          id?: string
          usuario_id: string
          matricula: string
          especialidade: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          usuario_id?: string
          matricula?: string
          especialidade?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      gestores: {
        Row: {
          id: string
          usuario_id: string
          matricula: string
          cargo: string
          created_at?: string | null
          updated_at?: string | null
        }
        Insert: {
          id?: string
          usuario_id: string
          matricula: string
          cargo: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          usuario_id?: string
          matricula?: string
          cargo?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      medicoes: {
        Row: {
          id: string
          ordem_id: string
          data_medicao: string
          valor_medicao: number
          status_aprovacao: string
          created_at?: string | null
          updated_at?: string | null
        }
        Insert: {
          id?: string
          ordem_id: string
          data_medicao: string
          valor_medicao: number
          status_aprovacao: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          ordem_id?: string
          data_medicao?: string
          valor_medicao?: number
          status_aprovacao?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      ordens_de_servico: {
        Row: {
          id: string
          contrato_id: string
          numero_ordem: string
          data_emissao: string
          descricao: string
          created_at?: string | null
          updated_at?: string | null
        }
        Insert: {
          id?: string
          contrato_id: string
          numero_ordem: string
          data_emissao: string
          descricao: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          contrato_id?: string
          numero_ordem?: string
          data_emissao?: string
          descricao?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      setores: {
        Row: {
          id: string
          nome_setor: string
          descricao: string
          created_at?: string | null
          updated_at?: string | null
        }
        Insert: {
          id?: string
          nome_setor: string
          descricao: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          nome_setor?: string
          descricao?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      usuarios: {
        Row: {
          id: string
          nome: string
          email: string
          senha: string
          tipo_usuario: string
          created_at?: string | null
          updated_at?: string | null
        }
        Insert: {
          id?: string
          nome: string
          email: string
          senha: string
          tipo_usuario: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          nome?: string
          email?: string
          senha?: string
          tipo_usuario?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

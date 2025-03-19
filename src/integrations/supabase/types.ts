export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      aditivos: {
        Row: {
          contrato_id: string
          created_at: string | null
          data_assinatura: string
          id: string
          justificativa: string
          nova_prazo: string | null
          numero_aditivo: string
          tipo_aditivo: string
          updated_at: string | null
          valor_aditivo: number
        }
        Insert: {
          contrato_id: string
          created_at?: string | null
          data_assinatura: string
          id?: string
          justificativa: string
          nova_prazo?: string | null
          numero_aditivo: string
          tipo_aditivo: string
          updated_at?: string | null
          valor_aditivo: number
        }
        Update: {
          contrato_id?: string
          created_at?: string | null
          data_assinatura?: string
          id?: string
          justificativa?: string
          nova_prazo?: string | null
          numero_aditivo?: string
          tipo_aditivo?: string
          updated_at?: string | null
          valor_aditivo?: number
        }
        Relationships: [
          {
            foreignKeyName: "aditivos_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
        ]
      }
      apostilas: {
        Row: {
          contrato_id: string
          created_at: string | null
          data_registro: string
          descricao: string
          id: string
          numero_apostila: string
          updated_at: string | null
        }
        Insert: {
          contrato_id: string
          created_at?: string | null
          data_registro: string
          descricao: string
          id?: string
          numero_apostila: string
          updated_at?: string | null
        }
        Update: {
          contrato_id?: string
          created_at?: string | null
          data_registro?: string
          descricao?: string
          id?: string
          numero_apostila?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "apostilas_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
        ]
      }
      contratos: {
        Row: {
          created_at: string | null
          data_inicio_execucao: string
          data_termino_execucao: string
          fiscal_id: string
          fornecedor: string
          gestor_id: string
          id: string
          numero_contrato: string
          setor_id: string
          status: string
          updated_at: string | null
          valor_original: number
        }
        Insert: {
          created_at?: string | null
          data_inicio_execucao: string
          data_termino_execucao: string
          fiscal_id: string
          fornecedor: string
          gestor_id: string
          id?: string
          numero_contrato: string
          setor_id: string
          status: string
          updated_at?: string | null
          valor_original: number
        }
        Update: {
          created_at?: string | null
          data_inicio_execucao?: string
          data_termino_execucao?: string
          fiscal_id?: string
          fornecedor?: string
          gestor_id?: string
          id?: string
          numero_contrato?: string
          setor_id?: string
          status?: string
          updated_at?: string | null
          valor_original?: number
        }
        Relationships: [
          {
            foreignKeyName: "contratos_fiscal_id_fkey"
            columns: ["fiscal_id"]
            isOneToOne: false
            referencedRelation: "fiscais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_gestor_id_fkey"
            columns: ["gestor_id"]
            isOneToOne: false
            referencedRelation: "gestores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contratos_setor_id_fkey"
            columns: ["setor_id"]
            isOneToOne: false
            referencedRelation: "setores"
            referencedColumns: ["id"]
          },
        ]
      }
      convenios: {
        Row: {
          created_at: string | null
          data_inicio: string
          data_termino: string
          fiscal_id: string
          gestor_id: string
          id: string
          numero_convenio: string
          participante_destino: string
          participante_origem: string
          setor_id: string
          status: string
          updated_at: string | null
          valor_total: number
        }
        Insert: {
          created_at?: string | null
          data_inicio: string
          data_termino: string
          fiscal_id: string
          gestor_id: string
          id?: string
          numero_convenio: string
          participante_destino: string
          participante_origem: string
          setor_id: string
          status: string
          updated_at?: string | null
          valor_total: number
        }
        Update: {
          created_at?: string | null
          data_inicio?: string
          data_termino?: string
          fiscal_id?: string
          gestor_id?: string
          id?: string
          numero_convenio?: string
          participante_destino?: string
          participante_origem?: string
          setor_id?: string
          status?: string
          updated_at?: string | null
          valor_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "convenios_fiscal_id_fkey"
            columns: ["fiscal_id"]
            isOneToOne: false
            referencedRelation: "fiscais"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "convenios_gestor_id_fkey"
            columns: ["gestor_id"]
            isOneToOne: false
            referencedRelation: "gestores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "convenios_setor_id_fkey"
            columns: ["setor_id"]
            isOneToOne: false
            referencedRelation: "setores"
            referencedColumns: ["id"]
          },
        ]
      }
      fiscais: {
        Row: {
          created_at: string | null
          especialidade: string
          id: string
          matricula: string
          updated_at: string | null
          usuario_id: string
        }
        Insert: {
          created_at?: string | null
          especialidade: string
          id?: string
          matricula: string
          updated_at?: string | null
          usuario_id: string
        }
        Update: {
          created_at?: string | null
          especialidade?: string
          id?: string
          matricula?: string
          updated_at?: string | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fiscais_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      gestores: {
        Row: {
          cargo: string
          created_at: string | null
          id: string
          matricula: string
          updated_at: string | null
          usuario_id: string
        }
        Insert: {
          cargo: string
          created_at?: string | null
          id?: string
          matricula: string
          updated_at?: string | null
          usuario_id: string
        }
        Update: {
          cargo?: string
          created_at?: string | null
          id?: string
          matricula?: string
          updated_at?: string | null
          usuario_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gestores_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      medicoes: {
        Row: {
          created_at: string | null
          data_medicao: string
          id: string
          ordem_id: string
          status_aprovacao: string
          updated_at: string | null
          valor_medicao: number
        }
        Insert: {
          created_at?: string | null
          data_medicao: string
          id?: string
          ordem_id: string
          status_aprovacao: string
          updated_at?: string | null
          valor_medicao: number
        }
        Update: {
          created_at?: string | null
          data_medicao?: string
          id?: string
          ordem_id?: string
          status_aprovacao?: string
          updated_at?: string | null
          valor_medicao?: number
        }
        Relationships: [
          {
            foreignKeyName: "medicoes_ordem_id_fkey"
            columns: ["ordem_id"]
            isOneToOne: false
            referencedRelation: "ordens_de_servico"
            referencedColumns: ["id"]
          },
        ]
      }
      ordens_de_servico: {
        Row: {
          contrato_id: string
          created_at: string | null
          data_emissao: string
          descricao: string
          id: string
          numero_ordem: string
          updated_at: string | null
        }
        Insert: {
          contrato_id: string
          created_at?: string | null
          data_emissao: string
          descricao: string
          id?: string
          numero_ordem: string
          updated_at?: string | null
        }
        Update: {
          contrato_id?: string
          created_at?: string | null
          data_emissao?: string
          descricao?: string
          id?: string
          numero_ordem?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ordens_de_servico_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
        ]
      }
      setores: {
        Row: {
          created_at: string | null
          descricao: string
          id: string
          nome_setor: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          descricao: string
          id?: string
          nome_setor: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          descricao?: string
          id?: string
          nome_setor?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          created_at: string | null
          email: string
          id: string
          nome: string
          senha: string
          tipo_usuario: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          nome: string
          senha: string
          tipo_usuario: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          nome?: string
          senha?: string
          tipo_usuario?: string
          updated_at?: string | null
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

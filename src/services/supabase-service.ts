
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

// Type for common response
type ApiResponse<T> = {
  data: T | null;
  error: Error | null;
};

// Service for Setores
export const setorService = {
  async getAll(): Promise<ApiResponse<Database['public']['Tables']['setores']['Row'][]>> {
    try {
      const { data, error } = await supabase
        .from('setores')
        .select('*')
        .order('nome_setor');
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async getById(id: string): Promise<ApiResponse<Database['public']['Tables']['setores']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('setores')
        .select('*')
        .eq('id', id)
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async create(setor: Database['public']['Tables']['setores']['Insert']): Promise<ApiResponse<Database['public']['Tables']['setores']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('setores')
        .insert(setor)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async update(id: string, setor: Database['public']['Tables']['setores']['Update']): Promise<ApiResponse<Database['public']['Tables']['setores']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('setores')
        .update(setor)
        .eq('id', id)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async delete(id: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase
        .from('setores')
        .delete()
        .eq('id', id);
      
      return { data: null, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
};

// Service for Fiscais
export const fiscalService = {
  async getAll(): Promise<ApiResponse<Database['public']['Tables']['fiscais']['Row'][]>> {
    try {
      const { data, error } = await supabase
        .from('fiscais')
        .select('*, usuarios(nome, email)');
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async getById(id: string): Promise<ApiResponse<Database['public']['Tables']['fiscais']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('fiscais')
        .select('*, usuarios(nome, email)')
        .eq('id', id)
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async create(fiscal: Database['public']['Tables']['fiscais']['Insert']): Promise<ApiResponse<Database['public']['Tables']['fiscais']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('fiscais')
        .insert(fiscal)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async update(id: string, fiscal: Database['public']['Tables']['fiscais']['Update']): Promise<ApiResponse<Database['public']['Tables']['fiscais']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('fiscais')
        .update(fiscal)
        .eq('id', id)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async delete(id: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase
        .from('fiscais')
        .delete()
        .eq('id', id);
      
      return { data: null, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
};

// Service for Gestores
export const gestorService = {
  async getAll(): Promise<ApiResponse<Database['public']['Tables']['gestores']['Row'][]>> {
    try {
      const { data, error } = await supabase
        .from('gestores')
        .select('*, usuarios(nome, email)');
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async getById(id: string): Promise<ApiResponse<Database['public']['Tables']['gestores']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('gestores')
        .select('*, usuarios(nome, email)')
        .eq('id', id)
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async create(gestor: Database['public']['Tables']['gestores']['Insert']): Promise<ApiResponse<Database['public']['Tables']['gestores']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('gestores')
        .insert(gestor)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async update(id: string, gestor: Database['public']['Tables']['gestores']['Update']): Promise<ApiResponse<Database['public']['Tables']['gestores']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('gestores')
        .update(gestor)
        .eq('id', id)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async delete(id: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase
        .from('gestores')
        .delete()
        .eq('id', id);
      
      return { data: null, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
};

// Service for Contratos
export const contratoService = {
  async getAll(): Promise<ApiResponse<Database['public']['Tables']['contratos']['Row'][]>> {
    try {
      const { data, error } = await supabase
        .from('contratos')
        .select(`
          *,
          fiscal:fiscal_id(id, usuarios(nome)),
          gestor:gestor_id(id, usuarios(nome)),
          setor:setor_id(id, nome_setor)
        `)
        .order('created_at', { ascending: false });
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async getById(id: string): Promise<ApiResponse<Database['public']['Tables']['contratos']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('contratos')
        .select(`
          *,
          fiscal:fiscal_id(id, usuarios(nome)),
          gestor:gestor_id(id, usuarios(nome)),
          setor:setor_id(id, nome_setor)
        `)
        .eq('id', id)
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async create(contrato: Database['public']['Tables']['contratos']['Insert']): Promise<ApiResponse<Database['public']['Tables']['contratos']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('contratos')
        .insert(contrato)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async update(id: string, contrato: Database['public']['Tables']['contratos']['Update']): Promise<ApiResponse<Database['public']['Tables']['contratos']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('contratos')
        .update(contrato)
        .eq('id', id)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async delete(id: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase
        .from('contratos')
        .delete()
        .eq('id', id);
      
      return { data: null, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
};

// Service for Convenios
export const convenioService = {
  async getAll(): Promise<ApiResponse<Database['public']['Tables']['convenios']['Row'][]>> {
    try {
      const { data, error } = await supabase
        .from('convenios')
        .select(`
          *,
          fiscal:fiscal_id(id, usuarios(nome)),
          gestor:gestor_id(id, usuarios(nome)),
          setor:setor_id(id, nome_setor)
        `)
        .order('created_at', { ascending: false });
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async getById(id: string): Promise<ApiResponse<Database['public']['Tables']['convenios']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('convenios')
        .select(`
          *,
          fiscal:fiscal_id(id, usuarios(nome)),
          gestor:gestor_id(id, usuarios(nome)),
          setor:setor_id(id, nome_setor)
        `)
        .eq('id', id)
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async create(convenio: Database['public']['Tables']['convenios']['Insert']): Promise<ApiResponse<Database['public']['Tables']['convenios']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('convenios')
        .insert(convenio)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async update(id: string, convenio: Database['public']['Tables']['convenios']['Update']): Promise<ApiResponse<Database['public']['Tables']['convenios']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('convenios')
        .update(convenio)
        .eq('id', id)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async delete(id: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase
        .from('convenios')
        .delete()
        .eq('id', id);
      
      return { data: null, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
};

// Service for Ordens de Servico
export const ordemServicoService = {
  async getAll(): Promise<ApiResponse<Database['public']['Tables']['ordens_de_servico']['Row'][]>> {
    try {
      const { data, error } = await supabase
        .from('ordens_de_servico')
        .select('*, contrato:contrato_id(numero_contrato, fornecedor)')
        .order('data_emissao', { ascending: false });
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async getById(id: string): Promise<ApiResponse<Database['public']['Tables']['ordens_de_servico']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('ordens_de_servico')
        .select('*, contrato:contrato_id(numero_contrato, fornecedor)')
        .eq('id', id)
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async create(ordem: Database['public']['Tables']['ordens_de_servico']['Insert']): Promise<ApiResponse<Database['public']['Tables']['ordens_de_servico']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('ordens_de_servico')
        .insert(ordem)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async update(id: string, ordem: Database['public']['Tables']['ordens_de_servico']['Update']): Promise<ApiResponse<Database['public']['Tables']['ordens_de_servico']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('ordens_de_servico')
        .update(ordem)
        .eq('id', id)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async delete(id: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase
        .from('ordens_de_servico')
        .delete()
        .eq('id', id);
      
      return { data: null, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
};

// Service for Medicoes
export const medicaoService = {
  async getAll(): Promise<ApiResponse<Database['public']['Tables']['medicoes']['Row'][]>> {
    try {
      const { data, error } = await supabase
        .from('medicoes')
        .select(`
          *,
          ordem:ordem_id(
            numero_ordem, 
            contrato:contrato_id(numero_contrato, fornecedor)
          )
        `)
        .order('data_medicao', { ascending: false });
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async getById(id: string): Promise<ApiResponse<Database['public']['Tables']['medicoes']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('medicoes')
        .select(`
          *,
          ordem:ordem_id(
            numero_ordem, 
            contrato:contrato_id(numero_contrato, fornecedor)
          )
        `)
        .eq('id', id)
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async create(medicao: Database['public']['Tables']['medicoes']['Insert']): Promise<ApiResponse<Database['public']['Tables']['medicoes']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('medicoes')
        .insert(medicao)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async update(id: string, medicao: Database['public']['Tables']['medicoes']['Update']): Promise<ApiResponse<Database['public']['Tables']['medicoes']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('medicoes')
        .update(medicao)
        .eq('id', id)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async delete(id: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase
        .from('medicoes')
        .delete()
        .eq('id', id);
      
      return { data: null, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
};

// Service for Aditivos
export const aditivoService = {
  async getAll(): Promise<ApiResponse<Database['public']['Tables']['aditivos']['Row'][]>> {
    try {
      const { data, error } = await supabase
        .from('aditivos')
        .select('*, contrato:contrato_id(numero_contrato, fornecedor)')
        .order('data_assinatura', { ascending: false });
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async getById(id: string): Promise<ApiResponse<Database['public']['Tables']['aditivos']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('aditivos')
        .select('*, contrato:contrato_id(numero_contrato, fornecedor)')
        .eq('id', id)
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async create(aditivo: Database['public']['Tables']['aditivos']['Insert']): Promise<ApiResponse<Database['public']['Tables']['aditivos']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('aditivos')
        .insert(aditivo)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async update(id: string, aditivo: Database['public']['Tables']['aditivos']['Update']): Promise<ApiResponse<Database['public']['Tables']['aditivos']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('aditivos')
        .update(aditivo)
        .eq('id', id)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async delete(id: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase
        .from('aditivos')
        .delete()
        .eq('id', id);
      
      return { data: null, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
};

// Service for Apostilas
export const apostilaService = {
  async getAll(): Promise<ApiResponse<Database['public']['Tables']['apostilas']['Row'][]>> {
    try {
      const { data, error } = await supabase
        .from('apostilas')
        .select('*, contrato:contrato_id(numero_contrato, fornecedor)')
        .order('data_registro', { ascending: false });
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async getById(id: string): Promise<ApiResponse<Database['public']['Tables']['apostilas']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('apostilas')
        .select('*, contrato:contrato_id(numero_contrato, fornecedor)')
        .eq('id', id)
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async create(apostila: Database['public']['Tables']['apostilas']['Insert']): Promise<ApiResponse<Database['public']['Tables']['apostilas']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('apostilas')
        .insert(apostila)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async update(id: string, apostila: Database['public']['Tables']['apostilas']['Update']): Promise<ApiResponse<Database['public']['Tables']['apostilas']['Row']>> {
    try {
      const { data, error } = await supabase
        .from('apostilas')
        .update(apostila)
        .eq('id', id)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async delete(id: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase
        .from('apostilas')
        .delete()
        .eq('id', id);
      
      return { data: null, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
};

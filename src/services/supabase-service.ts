
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

// Type for common response
type ApiResponse<T> = {
  data: T | null;
  error: Error | null;
};

// We'll define table types based on the schema rather than using GenericObject
type SetorInsert = Database['public']['Tables']['setores']['Insert'];
type FiscalInsert = Database['public']['Tables']['fiscais']['Insert'];
type GestorInsert = Database['public']['Tables']['gestores']['Insert'];
type ContratoInsert = Database['public']['Tables']['contratos']['Insert'];
type ConvenioInsert = Database['public']['Tables']['convenios']['Insert'];
type OrdemServicoInsert = Database['public']['Tables']['ordens_de_servico']['Insert'];
type MedicaoInsert = Database['public']['Tables']['medicoes']['Insert'];
type AditivoInsert = Database['public']['Tables']['aditivos']['Insert'];
type ApostilaInsert = Database['public']['Tables']['apostilas']['Insert'];

// Service for Setores
export const setorService = {
  async getAll(): Promise<ApiResponse<any[]>> {
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
  
  async getById(id: string): Promise<ApiResponse<any>> {
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
  
  async create(setor: SetorInsert): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase
        .from('setores')
        .insert(setor as SetorInsert)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async update(id: string, setor: Partial<SetorInsert>): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase
        .from('setores')
        .update(setor as Partial<SetorInsert>)
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
  async getAll(): Promise<ApiResponse<any[]>> {
    try {
      const { data, error } = await supabase
        .from('fiscais')
        .select('*, usuarios(nome, email)');
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async getById(id: string): Promise<ApiResponse<any>> {
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
  
  async create(fiscal: FiscalInsert): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase
        .from('fiscais')
        .insert(fiscal as FiscalInsert)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async update(id: string, fiscal: Partial<FiscalInsert>): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase
        .from('fiscais')
        .update(fiscal as Partial<FiscalInsert>)
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
  async getAll(): Promise<ApiResponse<any[]>> {
    try {
      const { data, error } = await supabase
        .from('gestores')
        .select('*, usuarios(nome, email)');
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async getById(id: string): Promise<ApiResponse<any>> {
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
  
  async create(gestor: GestorInsert): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase
        .from('gestores')
        .insert(gestor as GestorInsert)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async update(id: string, gestor: Partial<GestorInsert>): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase
        .from('gestores')
        .update(gestor as Partial<GestorInsert>)
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
  async getAll(): Promise<ApiResponse<any[]>> {
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
  
  async getById(id: string): Promise<ApiResponse<any>> {
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
  
  async create(contrato: ContratoInsert): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase
        .from('contratos')
        .insert(contrato as ContratoInsert)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async update(id: string, contrato: Partial<ContratoInsert>): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase
        .from('contratos')
        .update(contrato as Partial<ContratoInsert>)
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
  async getAll(): Promise<ApiResponse<any[]>> {
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
  
  async getById(id: string): Promise<ApiResponse<any>> {
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
  
  async create(convenio: ConvenioInsert): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase
        .from('convenios')
        .insert(convenio as ConvenioInsert)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async update(id: string, convenio: Partial<ConvenioInsert>): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase
        .from('convenios')
        .update(convenio as Partial<ConvenioInsert>)
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
  async getAll(): Promise<ApiResponse<any[]>> {
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
  
  async getById(id: string): Promise<ApiResponse<any>> {
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
  
  async create(ordem: OrdemServicoInsert): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase
        .from('ordens_de_servico')
        .insert(ordem as OrdemServicoInsert)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async update(id: string, ordem: Partial<OrdemServicoInsert>): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase
        .from('ordens_de_servico')
        .update(ordem as Partial<OrdemServicoInsert>)
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
  async getAll(): Promise<ApiResponse<any[]>> {
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
  
  async getById(id: string): Promise<ApiResponse<any>> {
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
  
  async create(medicao: MedicaoInsert): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase
        .from('medicoes')
        .insert(medicao as MedicaoInsert)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async update(id: string, medicao: Partial<MedicaoInsert>): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase
        .from('medicoes')
        .update(medicao as Partial<MedicaoInsert>)
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
  async getAll(): Promise<ApiResponse<any[]>> {
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
  
  async getById(id: string): Promise<ApiResponse<any>> {
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
  
  async create(aditivo: AditivoInsert): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase
        .from('aditivos')
        .insert(aditivo as AditivoInsert)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async update(id: string, aditivo: Partial<AditivoInsert>): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase
        .from('aditivos')
        .update(aditivo as Partial<AditivoInsert>)
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
  async getAll(): Promise<ApiResponse<any[]>> {
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
  
  async getById(id: string): Promise<ApiResponse<any>> {
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
  
  async create(apostila: ApostilaInsert): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase
        .from('apostilas')
        .insert(apostila as ApostilaInsert)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  async update(id: string, apostila: Partial<ApostilaInsert>): Promise<ApiResponse<any>> {
    try {
      const { data, error } = await supabase
        .from('apostilas')
        .update(apostila as Partial<ApostilaInsert>)
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

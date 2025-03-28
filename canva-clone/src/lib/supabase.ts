import { createClient } from '@supabase/supabase-js';
import type { Design, DesignContent } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key são necessários.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Funções auxiliares para autenticação
export const auth = {
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },
};

// Funções auxiliares para designs
export const designs = {
  list: async (userId: string) => {
    const { data, error } = await supabase
      .from('designs')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    return { 
      data: data as Design[] | null,
      error 
    };
  },

  get: async (designId: string) => {
    const { data, error } = await supabase
      .from('designs')
      .select('*')
      .eq('id', designId)
      .single();

    return { 
      data: data as Design | null,
      error 
    };
  },

  create: async (userId: string, designData: Partial<Design>) => {
    const { data, error } = await supabase
      .from('designs')
      .insert([
        { 
          ...designData,
          user_id: userId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select();

    return { 
      data: data as Design[] | null,
      error 
    };
  },

  update: async (designId: string, updates: Partial<Design>) => {
    const { data, error } = await supabase
      .from('designs')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', designId)
      .select();

    return { 
      data: data as Design[] | null,
      error 
    };
  },

  updateContent: async (designId: string, content: DesignContent) => {
    const { data, error } = await supabase
      .from('designs')
      .update({
        content,
        updated_at: new Date().toISOString()
      })
      .eq('id', designId)
      .select();

    return { 
      data: data as Design[] | null,
      error 
    };
  },

  delete: async (designId: string) => {
    const { error } = await supabase
      .from('designs')
      .delete()
      .eq('id', designId);

    return { error };
  },

  // Funções para templates
  listTemplates: async () => {
    const { data, error } = await supabase
      .from('designs')
      .select('*')
      .eq('is_template', true)
      .order('created_at', { ascending: false });

    return { 
      data: data as Design[] | null,
      error 
    };
  },

  duplicateTemplate: async (templateId: string, userId: string) => {
    // Primeiro, obtém o template
    const { data: template, error: getError } = await designs.get(templateId);
    
    if (getError || !template) {
      return { data: null, error: getError };
    }

    // Cria uma nova cópia do design
    const { data, error } = await designs.create(userId, {
      ...template,
      id: undefined, // Deixa o Supabase gerar um novo ID
      title: `${template.title} (Cópia)`,
      is_template: false,
      user_id: userId,
    });

    return { 
      data: data as Design[] | null,
      error 
    };
  },
};
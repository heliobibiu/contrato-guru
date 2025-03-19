
-- SQL to execute in Supabase SQL Editor to set up tables and policies

-- Enable RLS on all tables
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE setores ENABLE ROW LEVEL SECURITY;
ALTER TABLE fiscais ENABLE ROW LEVEL SECURITY;
ALTER TABLE gestores ENABLE ROW LEVEL SECURITY;
ALTER TABLE contratos ENABLE ROW LEVEL SECURITY;
ALTER TABLE convenios ENABLE ROW LEVEL SECURITY;
ALTER TABLE ordens_de_servico ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE aditivos ENABLE ROW LEVEL SECURITY;
ALTER TABLE apostilas ENABLE ROW LEVEL SECURITY;

-- Create policies for admin (full access)
CREATE POLICY "Admins have full access to all tables" ON usuarios 
  FOR ALL USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

CREATE POLICY "Admins have full access to all tables" ON setores 
  FOR ALL USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

CREATE POLICY "Admins have full access to all tables" ON fiscais 
  FOR ALL USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

CREATE POLICY "Admins have full access to all tables" ON gestores 
  FOR ALL USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

CREATE POLICY "Admins have full access to all tables" ON contratos 
  FOR ALL USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

CREATE POLICY "Admins have full access to all tables" ON convenios 
  FOR ALL USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

CREATE POLICY "Admins have full access to all tables" ON ordens_de_servico 
  FOR ALL USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

CREATE POLICY "Admins have full access to all tables" ON medicoes 
  FOR ALL USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

CREATE POLICY "Admins have full access to all tables" ON aditivos 
  FOR ALL USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

CREATE POLICY "Admins have full access to all tables" ON apostilas 
  FOR ALL USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

-- Create policies for gerencial (can view all and edit/update)
CREATE POLICY "Gerencials can view all and edit" ON usuarios 
  FOR SELECT USING (auth.jwt() -> 'app_metadata' ->> 'role' IN ('admin', 'gerente'));

CREATE POLICY "Gerencials can update records" ON usuarios 
  FOR UPDATE USING (auth.jwt() -> 'app_metadata' ->> 'role' IN ('admin', 'gerente'));

CREATE POLICY "Gerencials can view all and edit" ON setores 
  FOR SELECT USING (auth.jwt() -> 'app_metadata' ->> 'role' IN ('admin', 'gerente'));

CREATE POLICY "Gerencials can update records" ON setores 
  FOR UPDATE USING (auth.jwt() -> 'app_metadata' ->> 'role' IN ('admin', 'gerente'));

CREATE POLICY "Gerencials can insert records" ON setores 
  FOR INSERT WITH CHECK (auth.jwt() -> 'app_metadata' ->> 'role' IN ('admin', 'gerente'));

-- Create similar policies for all other tables...

-- Create policies for padrao (view only access)
CREATE POLICY "Standard users can view all" ON usuarios 
  FOR SELECT USING (true);

CREATE POLICY "Standard users can view all" ON setores 
  FOR SELECT USING (true);

CREATE POLICY "Standard users can view all" ON fiscais 
  FOR SELECT USING (true);

CREATE POLICY "Standard users can view all" ON gestores 
  FOR SELECT USING (true);

CREATE POLICY "Standard users can view all" ON contratos 
  FOR SELECT USING (true);

CREATE POLICY "Standard users can view all" ON convenios 
  FOR SELECT USING (true);

CREATE POLICY "Standard users can view all" ON ordens_de_servico 
  FOR SELECT USING (true);

CREATE POLICY "Standard users can view all" ON medicoes 
  FOR SELECT USING (true);

CREATE POLICY "Standard users can view all" ON aditivos 
  FOR SELECT USING (true);

CREATE POLICY "Standard users can view all" ON apostilas 
  FOR SELECT USING (true);

-- Create a function to update user roles in the auth.users table
CREATE OR REPLACE FUNCTION public.handle_user_role_update()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE auth.users
  SET raw_app_meta_data = 
    jsonb_set(
      raw_app_meta_data, 
      '{role}', 
      to_jsonb(NEW.tipo_usuario)
    )
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically update role in auth.users when updated in usuarios
CREATE TRIGGER on_user_role_update
  AFTER INSERT OR UPDATE OF tipo_usuario ON public.usuarios
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_user_role_update();

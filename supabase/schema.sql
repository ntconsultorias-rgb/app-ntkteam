-- =============================================
-- App Neto — Schema completo
-- Rodar no SQL Editor do Supabase
-- =============================================

-- Habilitar extensão para UUIDs
create extension if not exists "uuid-ossp";

-- =============================================
-- TRAINERS (personal trainers / admins)
-- =============================================
create table trainers (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  name text not null,
  email text not null unique,
  slug text not null unique, -- ex: "joaosilva" → joaosilva.appneto.com
  avatar_url text,
  created_at timestamptz default now()
);

-- =============================================
-- STUDENTS (alunos)
-- =============================================
create table students (
  id uuid primary key default uuid_generate_v4(),
  trainer_id uuid references trainers(id) on delete cascade not null,
  name text not null,
  email text,
  phone text,
  avatar_url text,
  access_pin text, -- PIN de 4-6 dígitos para login do aluno
  active boolean default true,
  created_at timestamptz default now()
);

-- =============================================
-- WORKOUT PLANS (planos de treino)
-- =============================================
create table workout_plans (
  id uuid primary key default uuid_generate_v4(),
  trainer_id uuid references trainers(id) on delete cascade not null,
  student_id uuid references students(id) on delete cascade not null,
  name text not null, -- ex: "Treino Hipertrofia - Abril"
  active boolean default true,
  created_at timestamptz default now()
);

-- =============================================
-- WORKOUT DAYS (dias do treino: A, B, C...)
-- =============================================
create table workout_days (
  id uuid primary key default uuid_generate_v4(),
  plan_id uuid references workout_plans(id) on delete cascade not null,
  name text not null, -- ex: "Treino A", "Segunda - Peito"
  order_index integer not null default 0,
  created_at timestamptz default now()
);

-- =============================================
-- EXERCISES (exercícios de cada dia)
-- =============================================
create table exercises (
  id uuid primary key default uuid_generate_v4(),
  day_id uuid references workout_days(id) on delete cascade not null,
  name text not null,
  sets integer not null default 3,
  reps text not null, -- ex: "12", "8-12", "até a falha"
  rest_seconds integer default 60,
  notes text,
  order_index integer not null default 0,
  created_at timestamptz default now()
);

-- =============================================
-- WORKOUT LOGS (registros do aluno)
-- =============================================
create table workout_logs (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid references students(id) on delete cascade not null,
  exercise_id uuid references exercises(id) on delete cascade not null,
  logged_at date not null default current_date,
  sets_done integer,
  reps_done text,
  weight_kg numeric(6,2),
  notes text,
  created_at timestamptz default now()
);

-- =============================================
-- DIET PLANS (planos de dieta)
-- =============================================
create table diet_plans (
  id uuid primary key default uuid_generate_v4(),
  trainer_id uuid references trainers(id) on delete cascade not null,
  student_id uuid references students(id) on delete cascade not null,
  name text not null, -- ex: "Dieta Cutting - Abril"
  calories_target integer,
  active boolean default true,
  created_at timestamptz default now()
);

-- =============================================
-- MEALS (refeições)
-- =============================================
create table meals (
  id uuid primary key default uuid_generate_v4(),
  plan_id uuid references diet_plans(id) on delete cascade not null,
  name text not null, -- ex: "Café da manhã", "Pré-treino"
  time_suggestion text, -- ex: "07:00"
  order_index integer not null default 0,
  created_at timestamptz default now()
);

-- =============================================
-- MEAL ITEMS (alimentos de cada refeição)
-- =============================================
create table meal_items (
  id uuid primary key default uuid_generate_v4(),
  meal_id uuid references meals(id) on delete cascade not null,
  food_name text not null,
  quantity text not null, -- ex: "100g", "2 unidades"
  calories integer,
  protein_g numeric(6,1),
  carbs_g numeric(6,1),
  fat_g numeric(6,1),
  order_index integer not null default 0,
  created_at timestamptz default now()
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

alter table trainers enable row level security;
alter table students enable row level security;
alter table workout_plans enable row level security;
alter table workout_days enable row level security;
alter table exercises enable row level security;
alter table workout_logs enable row level security;
alter table diet_plans enable row level security;
alter table meals enable row level security;
alter table meal_items enable row level security;

-- Trainers: só vê o próprio perfil
create policy "trainer_select_own" on trainers
  for select using (user_id = auth.uid());

create policy "trainer_insert_own" on trainers
  for insert with check (user_id = auth.uid());

create policy "trainer_update_own" on trainers
  for update using (user_id = auth.uid());

-- Students: trainer vê apenas seus alunos
create policy "trainer_manage_students" on students
  for all using (
    trainer_id in (select id from trainers where user_id = auth.uid())
  );

-- Workout plans: trainer gerencia seus planos
create policy "trainer_manage_workout_plans" on workout_plans
  for all using (
    trainer_id in (select id from trainers where user_id = auth.uid())
  );

-- Workout days: via plano do trainer
create policy "trainer_manage_workout_days" on workout_days
  for all using (
    plan_id in (
      select id from workout_plans
      where trainer_id in (select id from trainers where user_id = auth.uid())
    )
  );

-- Exercises: via dia → plano → trainer
create policy "trainer_manage_exercises" on exercises
  for all using (
    day_id in (
      select wd.id from workout_days wd
      join workout_plans wp on wp.id = wd.plan_id
      where wp.trainer_id in (select id from trainers where user_id = auth.uid())
    )
  );

-- Diet plans
create policy "trainer_manage_diet_plans" on diet_plans
  for all using (
    trainer_id in (select id from trainers where user_id = auth.uid())
  );

-- Meals
create policy "trainer_manage_meals" on meals
  for all using (
    plan_id in (
      select id from diet_plans
      where trainer_id in (select id from trainers where user_id = auth.uid())
    )
  );

-- Meal items
create policy "trainer_manage_meal_items" on meal_items
  for all using (
    meal_id in (
      select m.id from meals m
      join diet_plans dp on dp.id = m.plan_id
      where dp.trainer_id in (select id from trainers where user_id = auth.uid())
    )
  );

-- Workout logs: trainer vê logs dos seus alunos
create policy "trainer_manage_workout_logs" on workout_logs
  for all using (
    student_id in (
      select id from students
      where trainer_id in (select id from trainers where user_id = auth.uid())
    )
  );

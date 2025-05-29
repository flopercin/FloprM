// 1. Инициализация Supabase (ВАШИ КЛЮЧИ)
const supabaseUrl = 'https://gsmlairalxatqpasojkl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzbWxhaXJhbHhhdHFwYXNvamtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MzA4MDQsImV4cCI6MjA2NDEwNjgwNH0.Huy4sD9X217zMC_xmRGabyaz3v6KIlSf5e811EUJQ5k';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 2. Проверка авторизации при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
});

async function checkAuth() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (user) {
    document.getElementById('auth-status').textContent = `Вы вошли как: ${user.email}`;
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'block';
  } else {
    document.getElementById('auth-status').textContent = 'Вы не авторизованы.';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('logout-btn').style.display = 'none';
  }
}

// 3. Функция входа
async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const errorElement = document.getElementById('login-error');

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    errorElement.textContent = error.message;
  } else {
    errorElement.textContent = '';
    checkAuth(); // Обновляем статус
  }
}

// 4. Функция регистрации
async function register() {
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const errorElement = document.getElementById('register-error');

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    errorElement.textContent = error.message;
  } else {
    errorElement.textContent = 'Проверьте вашу почту для подтверждения!';
  }
}

// 5. Функция выхода
async function logout() {
  await supabase.auth.signOut();
  checkAuth(); // Обновляем статус
}

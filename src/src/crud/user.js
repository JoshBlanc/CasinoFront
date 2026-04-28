
const KEY = "users"

// Obtener usuarios
export const getUsers = () => {
  return JSON.parse(localStorage.getItem(KEY)) || []
}

// Crear usuario
export const createUser = (user) => {
  const users = getUsers()
  users.push(user)
  localStorage.setItem(KEY, JSON.stringify(users))
}

// Actualizar usuario
export const updateUser = (index, updatedUser) => {
  const users = getUsers()
  users[index] = updatedUser
  localStorage.setItem(KEY, JSON.stringify(users))
}

// Eliminar usuario
export const deleteUser = (index) => {
  const users = getUsers()
  users.splice(index, 1)
  localStorage.setItem(KEY, JSON.stringify(users))
}

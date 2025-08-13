const BASE_URL = import.meta.env.VITE_API_URL;

export async function getStudents() {
  const res = await fetch(`${BASE_URL}/students`);
  return res.json();
}

export async function getStudent(id) {
  const res = await fetch(`${BASE_URL}/students/${id}`);
  return res.json();
}

export async function createStudent(student) {
  const res = await fetch(`${BASE_URL}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  return res.json();
}

export async function updateStudent(id, student) {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  return res.json();
}

export async function deleteStudent(id) {
  const res = await fetch(`${BASE_URL}/students/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

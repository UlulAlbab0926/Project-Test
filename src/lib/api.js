export async function fetchIdeas({ page = 1, size = 10, sort = '-published_at' }) {
  const url = `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${page}&page[size]=${size}&sort=${sort}&populate[small_image]=*`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  });

  const json = await res.json();
  return json;// ✅ Bukan hanya json.data
}
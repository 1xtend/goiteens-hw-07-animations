import axios from 'axios';

export function createContactService({ name, number }) {
  return axios
    .post('/contacts', {
      name,
      number,
    })
    .then((res) => res.data);
}

export function getAllContactsService() {
  return axios
    .get('/contacts', {
      params: {
        _sort: 'id',
        _order: 'desc',
      },
    })
    .then((res) => res.data);
}

export function removeContactService(id) {
  return axios.delete(`/contacts/${id}`).then((res) => res.data);
}

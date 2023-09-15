import axios from 'axios'

export default class TaskService {
  static async getList() {
    const data = await axios.get('http://localhost:8080/api/v1/task')
    return data.data ?? null
  }
  static async getById(id: string) {
    const data = await axios.get(`http://localhost:8080/api/v1/task/${id}`)
    return data.data ?? null
  }
  static async create(data: { text: any }) {
    await axios.post(`http://localhost:8080/api/v1/task`, data)
  }
  static async update(id: string, data: { text: any }) {
    await axios.put(`http://localhost:8080/api/v1/task/${id}`, data)
  }
  static async delete(id: string) {
    await axios.delete(`http://localhost:8080/api/v1/task/${id}`)
  }
}

export default class SendingData {
  async PostForm (data) {
    return await fetch('#', {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: JSON.stringify(data)
    });
  }
}

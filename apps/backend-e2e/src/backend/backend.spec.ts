describe('GET /api', () => {
  it('should return a message', async () => {
    const res = await fetch(`/api`).then((res) => res.json());

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });
});

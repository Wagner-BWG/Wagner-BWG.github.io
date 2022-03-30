require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  //fail('Teste vazio');

  it('Teste se fetchProducts é uma função.', () => {;
    expect(typeof fetchProducts).toBe('function')
  })

  it('Testa se fetch foi chamada ao executar a função fetchProducts com o argumento "computador"', () => {
    fetchProducts('computador');
    expect(fetch).toBeCalled();
  })

  it('Testa se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador";', () => {
    fetchProducts('computador');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  })

  it('Testa se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch.', async () => {
    const received = await fetchProducts('computador');
    expect(received).toEqual(computadorSearch);
  })

  it('Testa se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url".', async () => {
    //Dica: Lembre-se de usar o new Error('mensagem esperada aqui') para comparar com o objeto retornado da API.') 
    expect(() => fetchProducts()).toThrowError(new Error('You must provide an url'));
  })
});

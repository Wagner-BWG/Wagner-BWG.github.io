require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // fail('Teste vazio');
  
  it('Testa se fetchItem é uma função.', () => {
    expect(typeof fetchItem).toBe('function');
    expect(typeof fetchItem).not.toBe('number');
  })

  it('Testa se fetch foi chamada ao executar a função fetchItem com o argumento do item "MLB1615760527"', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  })

  it('Testa se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527";', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })

  it('Testa se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    //  fetchItem('MLB1615760527').then((data) => {
    //   expect(data).toEqual(item);
    //  });
    const received = await fetchItem('MLB1615760527');
    expect(received).toEqual(item);
  })

  it('Testa se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url. ', () => {
    expect(() => fetchItem()).toThrowError(new Error('You must provide an url.'));
  })
});

function cardInnerHTML (carro) {
    const innerHTML = 
    `
        <div class="info">
            ${carro.info}
        </div>
        <div class="data">
            <table>
                <tr>
                    <th>
                        ${carro.nome}
                    </th>
                </tr>
                <tr>
                    <td>
                        <img
                            src="${carro.foto}"
                        >
                    </td>
                </tr>
                <tr>
                    <td>
                        <table class="subtable">
                            <tr>
                                <td class="details">Marca:</td>
                                <td class="details">${carro.marca}</td>
                            </tr>
                            <tr>
                                <td class="details">Motor:</td>
                                <td class="details">${carro.motor}</td>
                            </tr>
                            <tr>
                                <td class="details">Potência:</td>
                                <td class="details">${carro.potencia}</td>
                            </tr>
                            <tr>
                                <td class="details">País de origem:</td>
                                <td class="details">${carro.paisDeOrigem}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
`;
    return innerHTML;
}

export default cardInnerHTML;
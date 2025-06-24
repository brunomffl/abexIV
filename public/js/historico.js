document.addEventListener('DOMContentLoaded', () => {
    const listaHistorico = document.getElementById('lista-historico');

    fetch('/api/game/jogos/historico')
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success' && data.jogos.length > 0) {
                data.jogos.forEach(jogo => {
                    const item = document.createElement('li');
                    item.classList.add('item-historico');

                    const status = jogo.status === 'Ativo' ? 'Em andamento' : 'Finalizado';
                    const dataFim = jogo.data_fim_formatada ? jogo.data_fim_formatada : 'N/A';

                    item.innerHTML = `
                        <p><strong>Início:</strong> ${jogo.data_inicio_formatada}</p>
                        <p><strong>Fim:</strong> ${dataFim}</p>
                        <p><strong>Status:</strong> ${status}</p>
                        <p><strong>Saúde Final:</strong> ${jogo.saude}</p>
                        <p><strong>Estresse Final:</strong> ${jogo.estresse}</p>
                        <p><strong>Felicidade Final:</strong> ${jogo.felicidade}</p>
                        <p><strong>Saldo Final:</strong> R$ ${jogo.saldo.toFixed(2)}</p>
                    `;
                    listaHistorico.appendChild(item);
                });
            } else {
                listaHistorico.innerHTML = '<p class="sem-historico">Nenhuma partida encontrada no seu histórico.</p>';
            }
        })
        .catch(err => {
            console.error("Erro ao buscar histórico:", err);
            listaHistorico.innerHTML = '<p class="sem-historico">Ocorreu um erro ao carregar o histórico.</p>';
        });
});
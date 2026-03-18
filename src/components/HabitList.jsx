import { useState } from "react";
import HabitCard from "./HabitCard";
import { useEffect } from "react";


function HabitList({ }) {

    const [habits, setHabits] = useState(() => {
        // Esta função executa UMA VEZ — na montagem
        const stored = localStorage.getItem('my-daily-habits')

        // Se não há nada salvo — usa o array inicial
        if (!stored) return [
            { id: 1, nome: 'Exercício', descricao: 'Treino de força', meta: 5, ativo: true, diasFeitos: 5 },
            { id: 2, nome: 'Leitura', descricao: 'Livro ou artigo', meta: 7, ativo: true, diasFeitos: 3 },
            { id: 3, nome: 'Meditação', descricao: 'Respiração e foco', meta: 7, ativo: false, diasFeitos: 0 },
            { id: 4, nome: 'Hidratação', descricao: 'Beber 2L de água', meta: 7, ativo: true, diasFeitos: 6 },
        ]

        // Se há dados salvos — tenta fazer o parse
        try {
            return JSON.parse(stored)
        } catch {
            // Se o JSON estiver corrompido — volta pro array inicial
            return []
        }
    })



    const [novoNome, setNovoNome] = useState('')
    const [novaDescricao, setnovaDescricao] = useState('')
    const [novaMeta, setnovaMeta] = useState('')
    const [novaCategoria, setnovaCategoria] = useState('')

    useEffect(() => {
        localStorage.setItem('my-daily-habits', JSON.stringify(habits))
    }, [habits])

    const limparHistorico = () => {
        localStorage.removeItem('my-daily-habits')
        setHabits([
            //{ id: , nome: 'Exercício', descricao: 'Treino de força', meta: 5, ativo: true, diasFeitos: 5 },
            // ... hábitos iniciais
        ])
    }



    const adicionarHabit = (event) => {
        event.preventDefault()


        if (!novoNome.trim()) {
            alert('Informe o nome para o habito.')
            return
        }

        const novoHabit = {
            id: Date.now(),
            nome: novoNome,
            descricao: novaDescricao,
            meta: novaMeta,
            ativo: true,
            diasFeitos: 0,
            categoria: novaCategoria || 'Geral',
        }

        setHabits([...habits, novoHabit])

        //Limpar os campos após add
        setNovoNome('')
        setnovaDescricao('')
        setnovaMeta('')
        setnovaCategoria('')
    }

    const removerHabit = (id) => {
        setHabits(habits.filter(habit => habit.id !== id))

    }

    return (
        <section>
            <form onSubmit={adicionarHabit} className="habit-form">
                <div>
                    <label>
                        Nome do hábito *
                        <input
                            type="text"
                            value={novoNome}
                            onChange={(e) => setNovoNome(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Descrição
                    </label>
                    <input
                        type="text"
                        value={novaDescricao}
                        onChange={(e) => setnovaDescricao(e.target.value)}
                    />
                </div>

                <div>
                    <label>
                        Meta
                    </label>
                    <input
                        type="number"
                        value={novaMeta}
                        onChange={(e) => setnovaMeta(e.target.value)}
                    />
                </div>

                <div>
                    <label>
                        Categoria

                        <input
                            type="text"
                            value={novaCategoria}
                            onChange={(e) => setnovaCategoria(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Adicionar hábito</button>
            </form>


            <ul>
                <button onClick={limparHistorico}>Limpar histórico</button>

                {habits.length === 0
                    ? <p>Nenhum hábito cadastrado ainda. Que tal começar?</p>
                    : <p>Você tem {habits.length} hábito(s) cadastrado(s).</p>
                }


                {habits.map((habit) => (
                    <HabitCard
                        key={habit.id}
                        nome={habit.nome}
                        descricao={habit.descricao}
                        meta={habit.meta}
                        ativo={habit.ativo}
                        categoria={habit.categoria}
                        diasFeitos={habit.diasFeitos}
                        onRemover={() => removerHabit(habit.id)}
                    />
                )
                )}
            </ul>
        </section>
    );
}
export default HabitList;

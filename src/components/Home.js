import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MiniMap from './MiniMap';
import './Home.css';
import background from '../assets/background.jpg'; // Certifique-se de que o caminho está correto

const Home = () => {
  const faqs = [
    {
      question: 'Como faço para comprar uma passagem?',
      answer: 'Você pode comprar uma passagem cadastrando-se, adicionando saldo à sua conta e selecionando o ônibus desejado no nosso mapa interativo.'
    },
    {
      question: 'Quais métodos de pagamento são aceitos?',
      answer: 'Aceitamos pagamentos via PIX, cartão de crédito e débito.'
    },
    {
      question: 'Como adiciono saldo à minha conta?',
      answer: 'Você pode adicionar saldo à sua conta na página de pagamento, onde poderá escolher o método de pagamento de sua preferência.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="home-page">
      <section className="intro-section">
        <div className="text">
          <h1>Bem-vindo ao Fast Buss</h1>
          <p>A melhor forma de se locomover pela cidade.</p>
        </div>
      </section>
      <section className="minimap-section">
        <h2>Nosso Mapa</h2>
        <MiniMap />
      </section>
      <section className="background-section" style={{ backgroundImage: `url(${background})` }}>
        <div className="background-overlay">
          <p>Facilitando o seu dia a dia, transformando problemas em solução.</p>
        </div>
      </section>
      <div className="about-faq-section">
        <section className="about-section">
          <h2>Sobre Nós</h2>
          <p>A FastBus é o resultado da união de pensamentos e ideias de oito amigos que vivenciaram as dificuldades e dúvidas ao utilizar o transporte público. Diante disso, tivemos a iniciativa de ajudar pessoas que enfrentam os mesmos desafios, criando uma plataforma inovadora que proporciona maior praticidade e eficiência aos usuários do transporte público. Com a FastBus, você pode agilizar e otimizar suas viagens, garantindo mais tempo para se dedicar ao que realmente importa, facilitando seu dia a dia e permitindo que você continue com suas tarefas sem contratempos!</p>
        </section>
        <section className="faq-section">
          <h2>Perguntas Frequentes</h2>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq ${activeIndex === index ? 'active' : ''}`} onClick={() => toggleFaq(index)}>
                <p className="question">{faq.question}</p>
                <p className="answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="how-it-works-section">
        <h2>Como Funciona</h2>
        <div className="cards">
          <div className="card">
            <h3>Cadastre-se</h3>
            <p>Crie sua conta gratuitamente.</p>
          </div>
          <div className="card">
            <h3>Adicione Saldo</h3>
            <p>Adicione saldo à sua conta para poder comprar passagens.</p>
          </div>
          <div className="card">
            <h3>Compre sua passagem</h3>
            <p>Escolha o ônibus desejado e compre sua passagem.</p>
          </div>
        </div>
      </section>
      <section className="contact-section">
        <h2>Contato</h2>
        <form className="contact-form">
          <input type="text" placeholder="Seu nome" />
          <input type="email" placeholder="Seu email" />
          <textarea placeholder="Sua mensagem"></textarea>
          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
};

export default Home;

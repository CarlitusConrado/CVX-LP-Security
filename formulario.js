import { useState } from 'react';

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('✅ Mensagem enviada com sucesso!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('❌ ' + result.message);
      }
    } catch (error) {
      setStatus('❌ Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Fale Conosco</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          placeholder="Seu nome"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
          style={{ padding: '10px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '5px' }}
        />
        
        <input
          type="email"
          placeholder="Seu email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
          style={{ padding: '10px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '5px' }}
        />
        
        <textarea
          placeholder="Sua mensagem"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          required
          rows="5"
          style={{ padding: '10px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '5px', resize: 'vertical' }}
        />
        
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ 
            padding: '12px', 
            fontSize: '16px', 
            backgroundColor: isLoading ? '#ccc' : '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
      </form>
      
      {status && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: status.includes('✅') ? '#d4edda' : '#f8d7da',
          color: status.includes('✅') ? '#155724' : '#721c24',
          borderRadius: '5px'
        }}>
          {status}
        </div>
      )}
    </div>
  );
}
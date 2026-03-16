import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useCart } from '../context/CartContext'
import { Tag, Check } from 'lucide-react'

export default function DiscountCodeInput() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [applied, setApplied] = useState(false)
  const { cartTotal } = useCart() // In a real app, we'd update context with the discount

  const handleApply = async () => {
    setError('')
    const { data, error } = await supabase
      .from('discount_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single()

    if (error || !data) {
      setError('Código inválido o expirado')
    } else {
      setApplied(true)
      // Here you would typically apply the logic to the cart context
    }
  }

  return (
    <div className="discount-section glass" style={{ padding: '1.5rem', marginTop: '2rem' }}>
      <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Tag size={20} /> ¿Tienes un código?
      </h3>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <input 
          placeholder="INGRESA TU CÓDIGO" 
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          style={{ flex: 1 }}
          disabled={applied}
        />
        <button 
          onClick={handleApply} 
          className="btn-primary" 
          disabled={applied}
        >
          {applied ? <Check size={20} /> : 'Aplicar'}
        </button>
      </div>
      {error && <p style={{ color: '#ef4444', marginTop: '0.5rem', fontSize: '0.9rem' }}>{error}</p>}
      {applied && <p style={{ color: 'var(--accent)', marginTop: '0.5rem', fontSize: '0.9rem' }}>¡Descuento aplicado con éxito!</p>}
    </div>
  )
}

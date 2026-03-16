import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Plus, Edit, Trash2, Package, Tag, DollarSign, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Admin.css'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image_url: '',
    is_experimental: false
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    setLoading(true)
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts(data || [])
    setLoading(false)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData(product)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      await supabase.from('products').delete().eq('id', id)
      fetchProducts()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const productData = { ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) }
    
    if (editingProduct) {
      await supabase.from('products').update(productData).eq('id', editingProduct.id)
    } else {
      await supabase.from('products').insert(productData)
    }
    
    setShowModal(false)
    setEditingProduct(null)
    setFormData({ name: '', description: '', price: '', stock: '', image_url: '', is_experimental: false })
    fetchProducts()
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1><LayoutDashboard size={32} /> Panel de Administración</h1>
        <button onClick={() => { setEditingProduct(null); setShowModal(true); }} className="btn-primary">
          <Plus size={20} /> Nuevo Producto
        </button>
      </header>

      <div className="admin-stats">
        <div className="stat-card glass">
           <Package size={24} />
           <div>
              <h3>{products.length}</h3>
              <p>Productos Totales</p>
           </div>
        </div>
      </div>

      <div className="product-table-container glass">
        <table className="product-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td><img src={product.image_url || 'https://via.placeholder.com/50'} alt={product.name} /></td>
                <td>
                  <strong>{product.name}</strong>
                  {product.is_experimental && <span className="admin-badge">Exp</span>}
                </td>
                <td>${product.price}</td>
                <td className={product.stock < 5 ? 'low-stock' : ''}>{product.stock}</td>
                <td className="actions">
                  <button onClick={() => handleEdit(product)} className="btn-icon"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(product.id)} className="btn-icon delete"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal glass">
            <h2>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            <form onSubmit={handleSubmit} className="product-form">
              <input 
                placeholder="Nombre del producto" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                required 
              />
              <textarea 
                placeholder="Descripción" 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
              />
              <div className="form-row">
                <input 
                  type="number" 
                  placeholder="Precio" 
                  value={formData.price} 
                  onChange={e => setFormData({...formData, price: e.target.value})} 
                  required 
                />
                <input 
                  type="number" 
                  placeholder="Stock" 
                  value={formData.stock} 
                  onChange={e => setFormData({...formData, stock: e.target.value})} 
                  required 
                />
              </div>
              <input 
                placeholder="URL de Imagen" 
                value={formData.image_url} 
                onChange={e => setFormData({...formData, image_url: e.target.value})} 
              />
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={formData.is_experimental} 
                  onChange={e => setFormData({...formData, is_experimental: e.target.checked})} 
                />
                Es producto experimental
              </label>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancelar</button>
                <button type="submit" className="btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

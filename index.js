import sanity from '../sanity'
import imageUrlBuilder from '@sanity/image-url'
import { useEffect, useState } from 'react'

const builder = imageUrlBuilder(sanity)
function urlFor(source) {
  return builder.image(source)
}

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    sanity.fetch(`*[_type == "product"]{_id, title, price, description, image}`).then((data) => {
      setProducts(data)
    })
  }, [])

  return (
    <div style={{ padding: '2rem', background: '#0a0a0a', color: '#fff' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>🛍️ Intelio Marketplace Products</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {products.map((product) => (
          <div key={product._id} style={{ background: '#1b1b1b', padding: '20px', borderRadius: '12px' }}>
            {product.image && (
              <img src={urlFor(product.image).width(300).url()} alt={product.title} style={{ borderRadius: '8px', width: '100%' }} />
            )}
            <h2 style={{ marginTop: '10px', color: '#00f0ff' }}>{product.title}</h2>
            <p>{product.description}</p>
            <p><strong>${product.price}</strong></p>
          </div>
        ))}
      </div>
    </div>
  )
}

import React from 'react'
import imageUrlBuilder from '@sanity/image-url'
import sanityClient from '@sanity/client'

// Setup Sanity client
const client = sanityClient({
  projectId: '9jh6762v',   // ✅ your project ID
  dataset: 'production',   // ✅ your dataset
  useCdn: true,
  apiVersion: '2023-06-28', // ✅ use a stable date
})

const builder = imageUrlBuilder(client)
function urlFor(source) {
  return builder.image(source)
}

export async function getServerSideProps() {
  // Fetch products
  const products = await client.fetch(`
    *[_type == "product"]{
      _id,
      title,
      price,
      description,
      "imageUrl": image.asset->url,
      category->{title}
    }
  `)
  return {
    props: {
      products
    }
  }
}

export default function Home({ products }) {
  return (
    <div style={{ padding: '40px', fontFamily: 'Poppins, sans-serif', background: '#0a0a0a', color: '#fff' }}>
      <h1 style={{ textAlign: 'center', color: '#00f0ff' }}>🛒 Intelio Marketplace</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '40px'
      }}>
        {products.map(product => (
          <div key={product._id} style={{
            background: '#1b1b1b',
            padding: '20px',
            borderRadius: '12px'
          }}>
            <img 
              src={urlFor(product.imageUrl).width(400).url()} 
              alt={product.title} 
              style={{ width: '100%', borderRadius: '8px' }} 
            />
            <h2 style={{ color: '#00f0ff' }}>{product.title}</h2>
            <p>{product.description}</p>
            <p style={{ fontWeight: 'bold', color: '#00f0ff' }}>₹ {product.price}</p>
            <p style={{ fontSize: '12px', color: '#ccc' }}>Category: {product.category?.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

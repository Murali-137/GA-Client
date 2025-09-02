import React from 'react'
import Hp from '../components/Hp'
import Category from '../components/Category'
import BestSeller from '../components/BestSeller'
import NewsLetter from '../components/NewsLetter'

function Home() {
  return (
    <div>
      <Hp/>
      <Category/>
      <BestSeller/>
      <NewsLetter/>
    </div>
  )
}

export default Home

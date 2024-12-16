import React from 'react'

const ProductRow = ({product}) => {

  const style=product.stocked ? undefined : 'bg-danger bg-gradient bg-opacity-75 radiustl'
  const styles=product.stocked ? undefined : 'bg-danger bg-gradient bg-opacity-75 radiustr'



  return (
   <tr>
    <td className={style} >{product.name}</td>
    <td className={styles} >{product.price}</td>
   </tr>
  )
}
export default ProductRow


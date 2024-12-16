import { useEffect, useMemo, useRef, useState } from "react"
import Checkbox from "./components/forms/Checkbox"
import Input from "./components/forms/Input"
import ProductCategoryRow from "./components/products/ProductCategoryRow"
import ProductRow from "./components/products/ProductRow"
import { useIncrement } from "./hooks/useIncrement.js"
import { useFetch } from "./hooks/useFetch.js"


const PRODUCTS = [
  { category: "Fruits", price: "0,90 €", stocked: true, name: "Pomme" },
  { category: "Fruits", price: "0,90 €", stocked: true, name: "Fruit du dragon" },
  { category: "Fruits", price: "1,80 €", stocked: false, name: "Fruit de la passion" },
  { category: "Légumes", price: "1,80 €", stocked: true, name: "Épinards" },
  { category: "Légumes", price: "3,60 €", stocked: false, name: "Potiron" },
  { category: "Légumes", price: "0,90 €", stocked: true, name: "Petits pois" },
  { category: "Viandes", price: "8,00 €", stocked: true, name: "Poulet" },
  { category: "Viandes", price: "12,00 €", stocked: false, name: "Boeuf" },
  { category: "Poissons", price: "10,00 €", stocked: true, name: "Saumon" },
  { category: "Poissons", price: "6,50 €", stocked: false, name: "Cabillaud" },
  { category: "Poissons", price: "7,00 €", stocked: true, name: "Sardines" },
  { category: "Autres", price: "2,00 €", stocked: true, name: "Œufs" },
  { category: "Courses", price: "1,00 €", stocked: true, name: "Pain" },
  { category: "Courses", price: "4,50 €", stocked: true, name: "Lessive" },
  { category: "Courses", price: "8,00 €", stocked: true, name: "Produit vaisselle" },
  { category: "Courses", price: "3,00 €", stocked: true, name: "Gâteaux" },
  { category: "Boissons", price: "1,20 €", stocked: true, name: "Soda" },
  { category: "Boissons", price: "5,00 €", stocked: true, name: "Vin" }
];
function App() {

  const [showStockedOnly, setShowStockedOnly] = useState(false)

  const [search, setSearch] = useState('')

  const visibleProducts = PRODUCTS.filter(product => {
    if (showStockedOnly && !product.stocked) {
      return false
    }
    if (search && !product.name.toLowerCase().includes(search.toLowerCase())) {
      return false
    }
    return true
  })

  return (
    <>
      <div className="container mt-5 mx-auto">
        <SearchBar
          search={search}
          onSearchChange={setSearch}
          showStockedOnly={showStockedOnly}
          onStockedOnlyChange={setShowStockedOnly} />

        <ProductTable products={visibleProducts} />
      </div>
      <div>
        <MonUseEffect></MonUseEffect>
      </div>
      <div>
        <MonUseMemo></MonUseMemo>
      </div>
      <div>
        <MonUseRef></MonUseRef>
      </div>
      <div>
        <MonHookePerso></MonHookePerso>
      </div>
      <div>
        <MonHookAPI></MonHookAPI>
      </div>

    </>
  );
}
function SearchBar({ showStockedOnly, onStockedOnlyChange, search, onSearchChange }) {
  const message = showStockedOnly ? "Afficher tous les produits" : "N'afficher que les produits en stock";

  return (
    <div className="mb-3">
      <Input
        value={search}
        onChange={onSearchChange}
        placeholder="Rechercher..."
      />
      <Checkbox
        id="stocked"
        checked={showStockedOnly}
        onChange={onStockedOnlyChange}
        label={message}
      />
    </div>
  );
}

function ProductTable({ products }) {

  const rows = [];
  let lastCategory = null;

  for (let product of products) {
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow key={product.category} name={product.category} />);
    }
    lastCategory = product.category;
    rows.push(<ProductRow product={product} key={product.name} />);
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
function MonUseEffect() {

  const [duration, setDuration] = useState(5)
  const [secondsLeft, setSecondsLeft] = useState(duration)

  const handleChange = (v) => {
    setDuration(v)
    setSecondsLeft(v)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(v => {
        if (v <= 1) {
          clearInterval(timer)
          return 0
        }
        return v - 1
      })
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [duration])

  return (
    <>
      <div className="vstack gap-2">
        use effect
        <Input
          value={duration}
          onChange={handleChange}
          placeholder="Timer...."
        ></Input>
        <p>
          Décompte:{secondsLeft}
        </p>
      </div>
    </>
  )
}
function MonUseMemo() {
  const [firstName, setFirstName] = useState('Jhon')
  const [password, setPassword] = useState('MotDePasse')
  const security = useMemo(() => {
    return passwordSecurity(password)
  }, [password])

  return (
    <>
      <div className="container my-3 vstack gap-2">
        use memo
        <Input
          label="Nom d'Utilisateur"
          value={firstName}
          onChange={setFirstName}>
        </Input>
      </div>

      <div className="container my-3 vstack gap-2">
        <Input
          label="Mot de passe"
          value={password}
          onChange={setPassword}>
        </Input>
        Sécurité:{security}
      </div>
    </>
  )
}
function passwordSecurity(password) {

  if (password.length < 3) {
    return 'Faible'
  } else if (password.length < 6) {
    return 'Moyen'
  }
  return 'Fort'
}
function MonUseRef() {
  const ref = useRef(null)
  useEffect(() => {
    //retourne la hauteur de ref donc de la div (défini par lattribut ref dans le html)
    console.log(ref.current.offsetHeight)

  }, [])

  return (
    <>
      <div ref={ref}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit et atque nemo sed, quam quia sit fugiat voluptatibus
        est laborum deleniti dolore. Dolorem neque id perspiciatis eum earum doloremque, quo amet, ea nesciunt
        labore deleniti odio cupiditate sint aspernatur autem delectus hic vitae molestiae reprehenderit itaque adipisci
        culpa! Accusamus, dolore!Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit et atque nemo sed,
        quam quia sit fugiat voluptatibus
        est laborum deleniti dolore. Dolorem neque id perspiciatis eum earum doloremque, quo amet, ea nesciunt
        labore deleniti odio cupiditate sint aspernatur autem delectus hic vitae molestiae reprehenderit itaque adipisci
        culpa! Accusamus, dolore!
      </div>
    </>
  )
}
function MonHookePerso() {
  const { count, increment, decrement } = useIncrement({
    base: 0,
    max: 10,
    min: 0
  })
  return (
    <>
      <div>
        Compteur {count}
        <button onClick={increment}>Incrémenter</button>
        <button onClick={decrement}>Décrémenter</button>
      </div>
    </>
  )

}
function MonHookAPI() {
  const { loading, data, errors } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=10&_delay=2000')
  return (
    <>
      <div>
        {/*Si loading est true, le composant affiche un div avec le texte "Chargement..".*/}
        {loading && <div> Chargement..</div>}
        {errors && <div> {errors.toString()}</div>}
        {data && <div>
          <ul>
            {data.map(post=>(<li key={post.id}>{post.title}</li>))}
          </ul></div>}
      </div>
      </>
  )

}

export default App;
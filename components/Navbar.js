import Link from 'next/link'
const Navbar = () => (
  <nav className='navbar'>
    <Link href='/'>
      <a className='navbar-main'>PlanIt</a>
    </Link>
    <Link href='/new'>
      <a className='navbar-create'>Create Plan</a>
    </Link>
  </nav>
)

export default Navbar

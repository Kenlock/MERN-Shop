import AccountHeader from '../components/Account/AccountHeader'
import AccountOrders from '../components/Account/AccountOrders'
import AccountPermissions from '../components/Account/AccountPermissions'
import { parseCookies } from 'nookies'
import baseUrl from '../utils/baseUrl'
import { isRoot } from '../utils/auth'
import axios from 'axios'

const Account = ({ user, orders }) => (
    <>
      <AccountHeader {...user} />
      <AccountOrders orders={orders} />
      {isRoot(user) && <AccountPermissions currentUserId={user._id} />}
    </>
)

Account.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx)
  if (!token) return { orders: [] }
  const payload = { headers: { Authorization: token }}
  const url = `${baseUrl}/api/orders`
  const response = await axios.get(url, payload)
  return response.data
}

export default Account;

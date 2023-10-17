import { create } from 'twrnc'
import tailwindConfig from '../../tailwind.config'

// create the customized version...
const tw = create(tailwindConfig) // <- your path may differ

// ... and then this becomes the main function your app uses
export default tw

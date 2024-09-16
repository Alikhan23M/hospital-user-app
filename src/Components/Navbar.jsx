'use client'
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Doctors', to: '/doctors' },
  { name: 'Take Appointment', to: '/take-appointment' },
  { name: 'Track Appointment', to: '/track-appointment' },
  { name: 'About', to: '/About' },
]

export default function Navebar(props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const Logout = () => {
     setMobileMenuOpen(false);
    localStorage.removeItem('token')
    props.showAlert('You were Successfully loged out', 'success');
  }
  return (
    <>
      <header className=" inset-x-0 top-0 z-50 fixed w-full z-50 bg-white/30 backdrop-blur-lg  shadow-md">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://cdn3d.iconscout.com/3d/premium/thumb/doctor-appointment-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--medical-hospital-calendar-pack-healthcare-illustrations-3145170@0.png"
                className="h-12 w-auto"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} to={item.to} className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer">
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {localStorage.getItem('token') ? (
              <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900" onClick={Logout}>
                Log out <span aria-hidden="true">&rarr;</span>
              </Link>
            ) : (
              <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>


        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/doctor-appointment-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--medical-hospital-calendar-pack-healthcare-illustrations-3145170@0.png"
                  className="h-8 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link 
                      key={item.name}
                      to={item.to}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  {
                    localStorage.getItem('token')?(<Link
                      to="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={Logout}
                    >
                      Log out
                    </Link>):(<Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>)

                  }
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>

  )
}

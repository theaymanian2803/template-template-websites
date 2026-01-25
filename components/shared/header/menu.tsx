import { EllipsisVertical, ShoppingCart, UserIcon, MenuIcon, LogIn, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator' // Assuming you have this, if not, use <hr className="my-4" />
import Link from 'next/link'
import ModeToggle from './mode-toggle'

const Menu = () => {
  // Mock cart count for visual demo
  const cartCount = 3

  return (
    <div className="flex justify-end items-center py-2">
      {/* -------------------------------
          DESKTOP VIEW: Minimal & Pill Shaped
         ------------------------------- */}
      <nav className="hidden md:flex items-center gap-3 p-1 pl-4 pr-1 border rounded-full bg-background/50 backdrop-blur-sm shadow-sm">
        {/* Theme Toggle */}
        <ModeToggle />
        <div className="h-6 w-px bg-border mx-1" /> {/* Vertical Divider */}
        {/* Cart with Badge */}
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:bg-muted">
          <Link href="/cart" aria-label="Shopping Cart">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center rounded-full ring-2 ring-background">
                {cartCount}
              </span>
            )}
          </Link>
        </Button>
        {/* Sign In - Primary Action */}
        <Button asChild className="rounded-full px-6 transition-transform active:scale-95">
          <Link href="/sign-in">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Sign In</span>
          </Link>
        </Button>
      </nav>

      {/* -------------------------------
          MOBILE VIEW: Rich Drawer
         ------------------------------- */}
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-muted-foreground/20">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[320px] sm:w-[380px] p-0 flex flex-col h-full">
            {/* Mobile Header: User Profile Concept */}
            <SheetHeader className="p-6 bg-muted/30 border-b text-left">
              <SheetTitle className="text-lg font-bold flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <UserIcon className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-foreground">Guest User</span>
                  <span className="block text-xs font-normal text-muted-foreground">
                    Sign in to sync your cart
                  </span>
                </div>
              </SheetTitle>
            </SheetHeader>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
              <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Menu
              </p>

              <Button asChild variant="ghost" className="justify-start h-12 text-base font-medium">
                <Link href="/sign-in">
                  <LogIn className="mr-3 h-5 w-5 text-muted-foreground" />
                  Sign In / Register
                </Link>
              </Button>

              <Button asChild variant="ghost" className="justify-start h-12 text-base font-medium">
                <Link href="/cart">
                  <div className="relative mr-3">
                    <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 h-4 w-4 bg-red-500 text-[9px] text-white flex items-center justify-center rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  My Cart
                </Link>
              </Button>

              <Button asChild variant="ghost" className="justify-start h-12 text-base font-medium">
                <Link href="/orders">
                  <Package className="mr-3 h-5 w-5 text-muted-foreground" />
                  Track Orders
                </Link>
              </Button>

              <div className="my-4 px-2">
                <Separator />
              </div>
            </div>

            {/* Footer */}
            <SheetFooter className="p-6 border-t bg-muted/10 mt-auto">
              <div className="w-full text-center space-y-4">
                <Button className="w-full rounded-full" size="lg" asChild>
                  <Link href="/checkout">Checkout Now</Link>
                </Button>
                <p className="text-xs text-muted-foreground">© 2026 uncstore academy.</p>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}

export default Menu

import { Button } from "primereact/button"
import { Card } from "../components/Card"
import { BarChart3, Package, Shield, Zap } from "lucide-react"
import { Link } from "react-router-dom"


export const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">TechNova</h1>
                                <p className="text-sm text-gray-600">Inventory Management System</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <Button label="Login" text className="text-gray-700" />
                            </Link>
                            <Link to="/register">
                                <Button label="Get Started" className="bg-cyan-500 hover:bg-cyan-600 border-cyan-500" />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-5xl font-bold text-gray-900 mb-6">
                        Manage Your Technology
                        <br />
                        <span className="text-blue-600">Inventory with Ease</span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Streamline your product catalog, track inventory in real-time, and make data-driven decisions with our
                        powerful management system.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Button
                            label="Start Free Trial"
                            className="bg-cyan-500 hover:bg-cyan-600 border-cyan-500 px-8 py-3 text-lg"
                        />
                        <Button label="Watch Demo" outlined className="px-8 py-3 text-lg border-gray-300" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Everything You Need to Manage Your Inventory
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Feature 1 */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <Package className="w-6 h-6 text-blue-600" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Product Catalog</h4>
                                <p className="text-gray-600">
                                    Organize and manage your entire product inventory in one centralized location.
                                </p>
                            </div>
                        </Card>

                        {/* Feature 2 */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                                    <BarChart3 className="w-6 h-6 text-cyan-500" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Real-time Analytics</h4>
                                <p className="text-gray-600">
                                    Track stock levels, sales trends, and inventory performance with live data.
                                </p>
                            </div>
                        </Card>

                        {/* Feature 3 */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                    <Shield className="w-6 h-6 text-orange-500" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Secure & Reliable</h4>
                                <p className="text-gray-600">Enterprise-grade security to protect your valuable inventory data.</p>
                            </div>
                        </Card>

                        {/* Feature 4 */}
                        <Card className="hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                    <Zap className="w-6 h-6 text-green-600" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Fast & Efficient</h4>
                                <p className="text-gray-600">
                                    Lightning-fast performance to manage thousands of products effortlessly.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
                            <div className="text-gray-600">Products Managed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-cyan-500 mb-2">500+</div>
                            <div className="text-gray-600">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 mb-2">99.9%</div>
                            <div className="text-gray-600">Uptime</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Inventory Management?</h3>
                    <p className="text-xl text-blue-100 mb-8">
                        Join hundreds of businesses already using TechNova to streamline their operations.
                    </p>
                    <Button
                        label="Get Started Today"
                        className="bg-cyan-500 hover:bg-cyan-600 border-cyan-500 px-8 py-3 text-lg"
                    />
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Package className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-gray-900 font-semibold">TechNova</span>
                        </div>
                        <p className="text-gray-600 text-sm">© 2025 TechNova. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

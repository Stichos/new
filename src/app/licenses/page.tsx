'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LicensesPage() {
  const licenses = [
    {
      id: 1,
      name: 'zNode License',
      level: 'Premium',
      status: 'Active',
      expiry: 'December 31, 2025',
      features: ['Priority Rewards', '24/7 Support', 'Advanced Analytics', 'Community Access']
    },
    {
      id: 2,
      name: 'Burner License',
      level: 'Standard',
      status: 'Active',
      expiry: 'October 15, 2025',
      features: ['Standard Rewards', 'Basic Support', 'Essential Analytics']
    },
    {
      id: 3,
      name: 'zPoints License',
      level: 'Basic',
      status: 'Inactive',
      expiry: 'N/A',
      features: ['Basic Rewards']
    }
  ];

  return (
    <main className="flex flex-1 flex-col mt-28 mb-10">
      <Header />

      <div className="container flex flex-col flex-1 text-white">
        <div className="flex flex-col gap-10 w-full px-4 lg:px-0">
          <div className="mt-4">
            <h1 className="text-2xl font-bold mb-2">Your ZNode Licenses</h1>
            <p className="text-gray-400 mb-6">Manage your active licenses and view rewards eligibility</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {licenses.map((license) => (
                <Card key={license.id} className="rounded-lg border border-[#23262E] bg-[#13161B] overflow-hidden">
                  <CardHeader className="bg-[#0C0E12] border-b border-[#23262E] p-4">
                    <CardTitle className="text-lg font-bold flex justify-between items-center">
                      {license.name}
                      <span className={`text-sm px-2 py-1 rounded ${
                        license.status === 'Active'
                          ? 'bg-[#62e88b]/20 text-[#62e88b]'
                          : 'bg-gray-700 text-gray-400'
                      }`}>
                        {license.status}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="mb-4">
                      <p className="text-sm text-gray-400">Level</p>
                      <p className="text-base font-bold">{license.level}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-400">Expiry Date</p>
                      <p className="text-base font-bold">{license.expiry}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Features</p>
                      <ul className="list-disc pl-5">
                        {license.features.map((feature, index) => (
                          <li key={index} className="text-sm">{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

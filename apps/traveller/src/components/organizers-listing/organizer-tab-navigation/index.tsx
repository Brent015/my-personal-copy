import { cn } from '@/lib/utils';

interface OrganizerTabNavigationProps {
  activeTab: string;
  onTabSelect: (tab: string) => void;
}

const tabs = [
  { id: 'events', label: 'Events' },
  { id: 'overview', label: 'Overview' },
];

const OrganizerTabNavigation = ({
  activeTab,
  onTabSelect,
}: OrganizerTabNavigationProps) => {
  return (
    <nav className="w-full bg-white">
      <div className="max-w-screen-xl -mx-4 border-b border-outline-primary">
        <ul className="flex space-x-2 px-4 py-4">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                className={cn(
                  'relative py-1 px-2 text-xl font-medium transition-colors duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded',
                  tab.id === activeTab
                    ? 'text-yellow-primary bg-[#FBC50A1A]'
                    : 'text-grayscale-400 hover:text-gray-600'
                )}
                aria-current={tab.id === 'events' ? 'page' : undefined}
                onClick={() => onTabSelect(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default OrganizerTabNavigation;

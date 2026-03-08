export default function BottomNav({ currentTab, onTabChange, navItems }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200">
      <div className="flex items-stretch">
        {navItems.map((item) => {
          const active = currentTab === item.id || (currentTab === 'detail' && item.id === 'home');
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-colors relative"
            >
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary-600" />
              )}
              <span className={active ? 'text-primary-600' : 'text-slate-400'}>
                {item.icon(active)}
              </span>
              <span className={`text-[10px] font-semibold leading-tight ${active ? 'text-primary-600' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

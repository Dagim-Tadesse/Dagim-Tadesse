import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const DATA = [
  { day: "Oct 1", price: 349, avg: 350 },
  { day: "Oct 10", price: 340, avg: 348 },
  { day: "Oct 20", price: 325, avg: 345 },
  { day: "Nov 1", price: 330, avg: 342 },
  { day: "Nov 10", price: 310, avg: 338 },
  { day: "Nov 15", price: 290, avg: 334 },
  { day: "Today", price: 278, avg: 330, signal: "BUY" },
  { day: "Forecast +5d", price: 285, avg: 328 },
  { day: "Forecast +15d", price: 315, avg: 330 },
];

export function PriceGuardChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-44 w-full animate-pulse rounded-xl bg-white/[0.03] border border-white/5" />
    );
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-slate-400">Price Trend & AI Forecast</span>
        <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          Optimal Buy Window: $278 (-20.1%)
        </span>
      </div>
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ffd1" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#00ffd1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              domain={[250, 360]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-white/10 bg-[#0d121c] p-2 text-xs shadow-xl font-mono">
                      <p className="text-slate-300 font-semibold">{payload[0].payload.day}</p>
                      <p className="text-[#00ffd1]">
                        Price: ${payload[0].value}
                      </p>
                      <p className="text-slate-400">
                        90d Avg: ${payload[0].payload.avg}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine y={280} stroke="#f59e0b" strokeDasharray="3 3" />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#00ffd1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#priceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

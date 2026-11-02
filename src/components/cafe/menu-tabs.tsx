"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { cafeMenu } from "@/lib/data/cafe-menu";

export function MenuTabs() {
  return (
    <Tabs defaultValue={cafeMenu[0].id}>
      <TabsList>
        {cafeMenu.map((category) => (
          <TabsTrigger key={category.id} value={category.id}>
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {cafeMenu.map((category) => (
        <TabsContent key={category.id} value={category.id}>
          <Card className="flex flex-col gap-1 p-6 sm:p-8">
            {category.intro ? (
              <p className="pb-3 text-sm font-semibold text-pool-blue-dark">{category.intro}</p>
            ) : null}
            <ul className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
              {category.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-baseline justify-between gap-3 border-b border-dashed border-border py-3 text-sm"
                >
                  <span className="font-medium text-deep-ink">{item.name}</span>
                  <span className="flex-1 border-b border-dotted border-border/0" />
                  <span className="font-display font-bold text-western-red">
                    £{item.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { PostFeed } from "./components/PostFeed";
import { RightSidebar } from "./components/RightSidebar";

export default function Home() {
  return (
    <div className="py-4">
      {/* Mobile Navigation */}
      <div className="flex md:hidden flex-col space-y-4">
        <div className="flex space-x-2">
          <Button variant="destructive" className="flex-1">
            NEW
          </Button>
          <Button variant="outline" className="flex-1">
            BEST
          </Button>
          <Button variant="outline" className="flex-1">
            HOT
          </Button>
        </div>

        <Button variant="outline" className="w-full justify-between">
          <span className="flex items-center gap-2">
            <span className="font-medium">FILTERS</span>
            <span className="text-sm text-muted-foreground">
              AUTHOR: ALL • FEED: ALL • SORT: NEW
            </span>
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>

        <div className="grid grid-cols-2 gap-2">
          <Button className="w-full" variant="destructive">
            SUBMIT TIP
          </Button>
          <Button className="w-full" variant="destructive">
            CREATE POST
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="flex flex-col space-y-6">
        {/* Desktop Filters */}
        <div className="hidden md:flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-background sticky top-[57px] z-40 py-4 border-b">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 sm:pb-0">
            <div className="flex items-center gap-2 min-w-max">
              <span className="text-sm text-muted-foreground">AUTHOR:</span>
              <Button variant="outline" size="sm">
                ALL
              </Button>
            </div>
            <div className="flex items-center gap-2 min-w-max">
              <span className="text-sm text-muted-foreground">FEED:</span>
              <Button variant="outline" size="sm">
                ALL
              </Button>
            </div>
            <div className="flex items-center gap-2 min-w-max">
              <span className="text-sm text-muted-foreground">SORT:</span>
              <Button variant="outline" size="sm">
                NEW
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="destructive">SUBMIT TIP</Button>
            <Button variant="destructive">CREATE POST</Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          <div className="flex-1">
            <PostFeed />
          </div>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

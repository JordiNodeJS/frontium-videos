import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
  } from "@/components/ui/sidebar"
  
  export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>
                Frontium Videos
              </SidebarGroupLabel>
            </SidebarGroup>
          </SidebarContent>
        </SidebarHeader>
      </Sidebar>
    )
  }
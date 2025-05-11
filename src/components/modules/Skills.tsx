import {
    Code2,
    Server,
    Database,
    Plug,
    MonitorSmartphone,
    BarChart4,
    LineChart,
    Shapes,
    Camera,
    FileImage,
  } from "lucide-react";
  
  const skills = [
    { icon: Code2, name: "Frontend Development", color: "text-blue-600" },
    { icon: Server, name: "Backend Development", color: "text-red-500" },
    { icon: Database, name: "Database Management", color: "text-green-600" },
    { icon: Plug, name: "API Development", color: "text-purple-600" },
    { icon: MonitorSmartphone, name: "Responsive Design", color: "text-pink-600" },
    { icon: BarChart4, name: "Data Analysis", color: "text-indigo-600" },
    { icon: LineChart, name: "Data Visualization", color: "text-sky-600" },
    { icon: Shapes, name: "3D Modeling", color: "text-emerald-600" },
    { icon: Camera, name: "Video & Photo Editing", color: "text-rose-600" },
    { icon: FileImage, name: "Poster Creation", color: "text-lime-600" },
  ];
  
  export default function Skills() {
    return (
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300"
              >
                <Icon className={`w-8 h-8 mb-3 ${skill.color}`} />
                <span className="text-center text-base font-medium text-gray-800">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
  
'use client'

import { useProfile } from "../context/ProfileContext";
import Image from "next/image";
import Link from "next/link";

export default function ProfileInfo() {
  const { user } = useProfile();

  if (!user) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPlanBadge = (plan: string) => {
    const badges = {
      free: { text: 'Gratuito', color: 'bg-gray-100 text-gray-800' },
      premium: { text: 'Premium', color: 'bg-blue-100 text-blue-800' },
      pro: { text: 'Pro', color: 'bg-purple-100 text-purple-800' }
    };
    return badges[plan as keyof typeof badges] || badges.free;
  };

  const badge = getPlanBadge(user.subscription.plan);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={user.avatar}
            alt={`Avatar de ${user.fullName}`}
            fill
            className="rounded-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{user.fullName}</h1>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                {badge.text}
              </span>
            </div>
            <p className="text-lg text-gray-600">@{user.username}</p>
          </div>

          {user.bio && (
            <p className="text-gray-700 leading-relaxed">{user.bio}</p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {user.location && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{user.location}</span>
              </div>
            )}
            
            {user.website && (
              <Link 
                href={user.website} 
                target="_blank"
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                </svg>
                <span>Sitio web</span>
              </Link>
            )}

            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>Se unió en {formatDate(user.joinedDate)}</span>
            </div>
          </div>

          {/* Social Links */}
          {(user.socialLinks.twitter || user.socialLinks.linkedin || user.socialLinks.github) && (
            <div className="flex gap-3">
              {user.socialLinks.twitter && (
                <Link 
                  href={user.socialLinks.twitter} 
                  target="_blank"
                  className="text-gray-400 hover:text-blue-400"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              )}
              
              {user.socialLinks.linkedin && (
                <Link 
                  href={user.socialLinks.linkedin} 
                  target="_blank"
                  className="text-gray-400 hover:text-blue-600"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </Link>
              )}
              
              {user.socialLinks.github && (
                <Link 
                  href={user.socialLinks.github} 
                  target="_blank"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">GitHub</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{user.stats.coursesCompleted}</div>
            <div className="text-sm text-gray-600">Completados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{user.stats.coursesInProgress}</div>
            <div className="text-sm text-gray-600">En progreso</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{Math.round(user.stats.totalWatchTime / 60)}h</div>
            <div className="text-sm text-gray-600">Estudiadas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{user.stats.streak}</div>
            <div className="text-sm text-gray-600">Días racha</div>
          </div>
        </div>
      </div>
    </div>
  );
} 